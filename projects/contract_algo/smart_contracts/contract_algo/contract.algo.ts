import { Contract, GlobalState, uint64, Uint64, abimethod } from '@algorandfoundation/algorand-typescript';

export class CollaborationContract extends Contract {
  brandName = GlobalState<string>();
  creatorName = GlobalState<string>();
  adminName = GlobalState<string>();
  contractPrice = GlobalState<uint64>();
  proposalText = GlobalState<string>();

  @abimethod()
  public initialize(
    brandName: string,
    creatorName: string,
    adminName: string,
    contractPrice: uint64,
    proposalText: string
  ): void {
    this.brandName.value = brandName;
    this.creatorName.value = creatorName;
    this.adminName.value = adminName;
    this.contractPrice.value = contractPrice;
    this.proposalText.value = proposalText;
  }

  @abimethod()
  public getDetails(): [string, string, string, uint64, string] {
    return [
      this.brandName.value,
      this.creatorName.value,
      this.adminName.value,
      this.contractPrice.value,
      this.proposalText.value,
    ];
  }
}
