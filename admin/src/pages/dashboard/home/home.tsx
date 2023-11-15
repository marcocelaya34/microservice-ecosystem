import React, { useEffect, useState, useMemo } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import "./styles.css";
import { Flex } from "antd";

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

const DataComponent: React.FC<Props> = ({ data }) => {
  const renderedData = useMemo(
    () =>
      data.map((item: any) => {
        return (
          <div key={item.uuid} className="box">
            <p>{item.accountExternalIdDebit}</p>
            <p>{item.accountExternalIdCredit}</p>
            <p>{item.tranferTypeId}</p>
            <p>{item.value}</p>
            <p>{item.transactionExternalId}</p>
            <p>{item.transactionType?.name}</p>
            <p>{item.transactionStatus?.name}</p>
            <p>{item.createdAt}</p>
            <p>{item.updatedAt}</p>
          </div>
        );
      }),
    [data]
  );

  return renderedData;
};

function Home() {
  const { data: subscriptionData } = useSubscription(
    UPDATE_TRANSACTIONS_SUBSCRIPTION
  );
  const { data: queryData } = useQuery(TRANSACTIONS_QUERY, {
    pollInterval: 500,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (queryData) {
      setTransactions(queryData.getTransactions);
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

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a:Transaction, b:Transaction) => +new Date(b.createdAt) - +new Date(a.createdAt)
    );
  }, [transactions]);

  return (
    <div>
      <h1>Home</h1>
      <div className="container">
        <Flex wrap="wrap" gap="small" justify="flex-start" align="center">
          {sortedTransactions.length > 0 && <DataComponent data={sortedTransactions} />}
        </Flex>
      </div>
    </div>
  );
}

export default Home;
