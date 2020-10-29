import { Transfer } from '../generated/POS Exit Subgraph/childerc20'
import { toDecimal } from './numbers'
import { TransferEntity } from '../generated/schema'
 
 const PREDICATE_PROXY = "0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf"

// token, from, amount, to
export function handleTransfer(event: Transfer): void {
   
  let TransferEntity = new TransferEntity(event.transaction.hash.toHex());
  TransferEntity.from = event.params.from
  TransferEntity.to = event.params.to 
  TransferEntity.value = toDecimal(event.params.value, 18) 
  TransferEntity.transaction = event.transaction.hash

  if (TransferEntity.from.toHex() == PREDICATE_PROXY) {
      return 
  }
  TransferEntity.save()
}