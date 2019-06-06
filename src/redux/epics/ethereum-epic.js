import { from, of } from "rxjs";
import { map, mergeMap, flatMap, catchError } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";
import InfuraAPI from "../../services/infura-api";
import _ from "lodash";

import ethereumActions from "../actions/ethereum-actions";
import { hexToNumber } from "../../helpers";

const fetchBlockRangeEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.FETCH_BLOCK_RANGE),
    flatMap(action => {
      const { startingBlockNumber, endingBlockNumber } = action.payload;

      return _.range(startingBlockNumber, endingBlockNumber).map(blockNumber =>
        ethereumActions.fetchBlock({ blockNumber })
      );
    })
  );

const fetchBlockEpic = action$ =>
  action$.pipe(
    ofType(ethereumActions.FETCH_BLOCK),
    mergeMap(action => {
      const { blockNumber } = action.payload;

      return from(InfuraAPI.getBlockByNumber(blockNumber)).pipe(
        map(({ data: { result } }) => {
          const number = hexToNumber(result.number);
          const timestamp = hexToNumber(result.timestamp);
          const gasLimit = hexToNumber(result.gasLimit);
          const gasUsed = hexToNumber(result.gasUsed);
          const transactions = result.transactions.map(t => ({
            ...t,
            gasPrice: hexToNumber(t.gasPrice),
            gas: hexToNumber(t.gas),
          }));

          return ethereumActions.fetchBlockSuccess({
            number,
            timestamp,
            transactions,
            gasLimit,
            gasUsed,
          });
        }),
        catchError(error => {
          console.log("ERROR: ", error);
          return of(ethereumActions.fetchBlockFailure({ error }));
        })
      );
    })
  );

export default combineEpics(fetchBlockRangeEpic, fetchBlockEpic);
