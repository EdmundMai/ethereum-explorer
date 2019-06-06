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
          // console.log("xxxxx: ", result);
          const { transactions } = result;
          console.log("ttttttttttttt: ", transactions[0]);
          const number = hexToNumber(result.number);
          const timestamp = hexToNumber(result.timestamp);

          return ethereumActions.fetchBlockSuccess({
            number,
            timestamp,
            transactions,
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
