import {gql} from '@apollo/client';

export const INCREMENT_COUNTER = gql`
mutation CreateTransaction(
    $accountExternalIdDebit: String!,
    $accountExternalIdCredit: String!,
    $tranferTypeId: Float!,
    $value: Float!
) {
    createTransaction(
        createTransactionDTO: {
            accountExternalIdDebit: $accountExternalIdDebit
            accountExternalIdCredit: $accountExternalIdCredit
            tranferTypeId: $tranferTypeId
            value: $value
        }
    ) {
        value
    }
}
`;
