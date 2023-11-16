import { gql, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Input } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import "./styles.css";

const TRANSACTIONS_QUERY = gql`
  mutation CreateTransaction(
    $accountExternalIdDebit: String!
    $accountExternalIdCredit: String!
    $tranferTypeId: Float!
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

const TransactionsForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [createTransaction] = useMutation(TRANSACTIONS_QUERY);

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const callApi = async (
    accountExternalIdDebit: string,
    accountExternalIdCredit: string,
    tranferTypeId: number,
    value: number
  ) => {
    try {
      const accessToken = await getAccessTokenSilently();

      await createTransaction({
        variables: {
          accountExternalIdDebit,
          accountExternalIdCredit,
          tranferTypeId,
          value,
        },
        context: {
          headers: {
            Bearer: accessToken,
          },
        },
      });

      setSuccess(true);
    } catch (e: any) {
      if (e.message === "Unauthorized") {
        setAlert(true);
      }
    }
  };

  const Formulario = () => {
    const formik = useFormik({
      initialValues: {
        accountExternalIdDebit: "",
        accountExternalIdCredit: "",
        tranferTypeId: "",
        value: "",
      },
      validationSchema: Yup.object().shape({
        accountExternalIdDebit: Yup.string()
          .min(3, "Debe ser mayor a 3 caracteres")
          .max(50, "Debe ser menor a 50 caracteres")
          .required("Requerido"),
        accountExternalIdCredit: Yup.string()
          .min(3, "Debe ser mayor a 3 caracteres")
          .max(50, "Debe ser menor a 50 caracteres")
          .required("Requerido"),
        tranferTypeId: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
        value: Yup.number()
          .typeError("Debe ser un número")
          .required("Requerido"),
      }),
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        await callApi(
          values.accountExternalIdDebit,
          values.accountExternalIdCredit,
          parseInt(values.tranferTypeId),
          parseInt(values.value)
        );
        resetForm();
        setSubmitting(false);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <p className="labelForm">AccountExternalIdDebit</p>
        <Input
          type="text"
          name="accountExternalIdDebit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="accountExternalIdDebit"
          value={formik.values.accountExternalIdDebit}
        />
        {formik.errors.accountExternalIdDebit ? (
          <div className="erroMessage">
            {formik.errors.accountExternalIdDebit}
          </div>
        ) : null}

        <p className="labelForm">AccountExternalIdCredit</p>
        <Input
          type="text"
          name="accountExternalIdCredit"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="accountExternalIdCredit"
          value={formik.values.accountExternalIdCredit}
        />
        {formik.errors.accountExternalIdCredit ? (
          <div className="erroMessage">
            {formik.errors.accountExternalIdCredit}
          </div>
        ) : null}
        <p className="labelForm">TranferTypeId</p>
        <Input
          type="text"
          name="tranferTypeId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="tranferTypeId"
          value={formik.values.tranferTypeId}
        />
        {formik.errors.tranferTypeId ? (
          <div className="erroMessage">{formik.errors.tranferTypeId}</div>
        ) : null}
        <p className="labelForm">Value</p>
        <Input
          type="text"
          name="value"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="value"
          value={formik.values.value}
        />
        {formik.errors.value ? (
          <div className="erroMessage">{formik.errors.value}</div>
        ) : null}
        <button className="buttonSend" type="submit">
          Crear
        </button>
      </form>
    );
  };

  return (
    <div>
      {alert && <Alert type="error" message="Usuario sin permisos" banner />}
      {success && <Alert type="success" message="Transacción Creada" banner />}
      <p className="labelTitle">Agrega una nueva transacción:</p>
      {Formulario()}
    </div>
  );
};

export default TransactionsForm;
