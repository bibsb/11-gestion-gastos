import './App.css';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import TotalBlock from './components/TotalBlock';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (values, { resetForm }) => {
    let tempExpenses = [...expenses];
    let tempValues = {
      id: Math.random(),
      description: values.description,
      category: values.category,
      price: values.price,
    };
    tempExpenses.push(tempValues);
    setExpenses(tempExpenses);
    resetForm();
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((expense) => expense.id !== id);
    //los que son diferentes son los q queremos q se mantengan
    setExpenses(tempExpenses);
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Gestión de gastos
            </a>
            {/* <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active">Recalcular</a>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>
      </header>
      <main className="flex-shrink-0 pt-5">
        <div className="container pt-5">
          <table className="table">
            <thead>
              <tr>
                <th className="col-6 text-start">Descripción</th>
                <th className="col-3 text-start">Categoría</th>
                <th className="col-2 text-start">Precio</th>
                <th className="col-1 text-start">Opc</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{`${expense.price} €`}</td>
                  <td>
                    <i
                      className="ri-delete-bin-6-line btn btn-danger btn-sm ms-3"
                      onClick={() => handleDelete(expense.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TotalBlock expenses={expenses} />
          <div className="card mt-5">
            <div className="card-header">Añadir gasto</div>
            <div className="card-body">
              <Formik
                initialValues={{
                  description: '',
                  category: '',
                  price: '',
                }}
                onSubmit={(values, { resetForm }) =>
                  handleAddExpense(values, { resetForm })
                }
              >
                {() => (
                  <Form>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Descripción</span>
                      <Field
                        name="description"
                        className="form-control"
                        placeholder="Descripción"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Categoría</span>
                      <Field
                        name="category"
                        className="form-control"
                        placeholder="Categoría"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Precio €</span>
                      <Field
                        name="price"
                        className="form-control"
                        placeholder="Precio"
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary">
                      Añadir
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
