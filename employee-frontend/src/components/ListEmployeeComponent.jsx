import React, { useEffect, useState } from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([])
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])

  function getAllEmployees() {
    listEmployees().then((response) => {
      setEmployees(response.data);
      console.log('Employees loaded:', response.data);
    }).catch(error => {
      console.error('Error loading employees:', error);
    })
  }

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      console.log('Deleting employee with id:', id);
      
      deleteEmployee(id).then((response) => {
        console.log('Employee deleted successfully');
        getAllEmployees();
      }).catch(error => {
        console.error('Error deleting employee:', error);
      })
    }
  }

  return (
    <div className='container'>
      <h2 className='page-title'>Employee Directory</h2>
      <div className='text-center mb-4'>
        <button className='btn-custom-primary btn' onClick={addNewEmployee}>
          <i className="bi bi-plus-circle me-2"></i>
          Add New Employee
        </button>
      </div>
      
      {employees.length === 0 ? (
        <div className='custom-card'>
          <div className='empty-state'>
            <h3>No Employees Found</h3>
            <p>Click "Add New Employee" to get started!</p>
          </div>
        </div>
      ) : (
        <div className='custom-table'>
          <table className='table table-hover mb-0'>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                employees.map(employee =>
                  <tr key={employee.id}>
                    <td><strong>#{employee.id}</strong></td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>
                      <i className="bi bi-envelope me-2"></i>
                      {employee.email}
                    </td>
                    <td>
                      <button className='btn btn-update' onClick={() => updateEmployee(employee.id)}>
                        <i className="bi bi-pencil-square me-1"></i>
                        Update
                      </button>
                      <button className='btn btn-delete' onClick={() => removeEmployee(employee.id)}>
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListEmployeeComponent
