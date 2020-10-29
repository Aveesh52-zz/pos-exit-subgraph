import { Transfer } from '../generated/POS Exit Subgraph/childerc20'
//import { toDecimal } from './numbers'
import { TransferEntity } from '../generated/schema'
 
 const PREDICATE_PROXY = "0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf"

// token, from, amount, to
export function handleTransfer(event: Transfer): void {
   
  let transferEntity = new TransferEntity(event.transaction.hash.toHex());
  transferEntity.from = event.params.from
  transferEntity.to = event.params.to 
  transferEntity.value = event.params.value
  transferEntity.transaction = event.transaction.hash

  if (transferEntity.from.toHex() == PREDICATE_PROXY) {
      return 
  }
  transferEntity.save()
}