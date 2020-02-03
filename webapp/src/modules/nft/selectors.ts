import { createSelector } from 'reselect'
import { createMatchSelector } from 'connected-react-router'
import { getData as getNFTs } from '../nft/selectors'
import { locations } from '../routing/locations'
import { RootState } from '../reducer'
import { NFTState } from './reducer'
import { NFT } from './types'
import { getNFT } from './utils'

export const getState = (state: RootState) => state.nft
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error

const matchSelector = createMatchSelector<
  RootState,
  {
    contractAddress: string
    tokenId: string
  }
>(locations.ntf(':contractAddress', ':tokenId'))

export const getContractAddress = createSelector<
  RootState,
  ReturnType<typeof matchSelector>,
  string | null
>(matchSelector, match => match?.params.contractAddress || null)

export const getTokenId = createSelector<
  RootState,
  ReturnType<typeof matchSelector>,
  string | null
>(matchSelector, match => match?.params.tokenId || null)

export const getCurrentNFT = createSelector<
  RootState,
  string | null,
  string | null,
  NFTState['data'],
  NFT | null
>(
  state => getContractAddress(state),
  state => getTokenId(state),
  state => getNFTs(state),
  (contractAddress, tokenId, nfts) => getNFT(contractAddress, tokenId, nfts)
)
