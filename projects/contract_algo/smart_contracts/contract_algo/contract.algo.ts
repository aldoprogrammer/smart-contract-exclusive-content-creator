import { Contract } from '@algorandfoundation/algorand-typescript'

export class ContractAlgo extends Contract {
  hello(name: string): string {
    return `Hello, ${name}`
  }
}
