import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";

interface Props {
  data: any;
}

interface DataType {
  key: React.Key;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  tranferTypeId: string;
  value: string;
  transactionStatus: { name: string };
  createdAt: string;
  updatedAt: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "AccountExternalIdDebit",
    dataIndex: "accountExternalIdDebit",
  },
  {
    title: "AccountExternalIdCredit",
    dataIndex: "accountExternalIdCredit",
  },
  {
    title: "TranferTypeId",
    dataIndex: "tranferTypeId",
  },
  {
    title: "Value",
    dataIndex: "value",
    defaultSortOrder: "descend",
    sorter: (a, b) => parseInt(a.value) - parseInt(b.value),
  },
  {
    title: "TransactionStatus",
    dataIndex: ["transactionStatus", "name"],
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    title: "UpdatedAt",
    dataIndex: "updatedAt",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
];

const TableComponent: React.FC<Props> = ({ data }) => {
  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );
};

export default TableComponent;
