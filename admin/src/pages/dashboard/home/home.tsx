import { useQuery, gql, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import moment from "moment";
import "./styles.css";

import TableComponent from "../../../components/tableComponent";

moment.locale("es");

interface Transaction {
  uuid: string;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: string;
  value: string;
  transactionExternalId: string;
  transactionType: {
    name: string;
  };
  transactionStatus: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UPDATE_TRANSACTIONS_SUBSCRIPTION = gql`
  subscription {
    updatedTransaction {
      uuid
      transactionStatus {
        name
      }
    }
  }
`;

const TRANSACTIONS_QUERY = gql`
  query {
    getTransactions {
      uuid
      accountExternalIdDebit
      accountExternalIdCredit
      tranferTypeId
      value
      transactionExternalId
      transactionType {
        name
      }
      transactionStatus {
        name
      }
      createdAt
      updatedAt
    }
  }
`;

interface Props {
  data: any;
}


function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data: subscriptionData } = useSubscription(
    UPDATE_TRANSACTIONS_SUBSCRIPTION
  );
  const { data: queryData } = useQuery(TRANSACTIONS_QUERY, {
    pollInterval: 500,
  });

  useEffect(() => {
    if (queryData) {
      setTransactions(queryData.getTransactions.map((item: Transaction) => {return {...item, key: item.uuid}}));
    }
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData) {
      const newTransactions: any = transactions.map((item: Transaction) => {
        if (item.uuid === subscriptionData.updatedTransaction.uuid) {
          return {
            ...item,
            transactionStatus:
              subscriptionData.updatedTransaction.transactionStatus,
          };
        }
        return item;
      });

      setTransactions(newTransactions);
    }
  }, [subscriptionData]);

  return (
    <>
      <div className="titleContainer">
        <h5>Transacciones</h5>
      </div>
      <div className="containerHome">
        <TableComponent data={transactions} />
      </div>
    </>
  );
}

export default Home;
