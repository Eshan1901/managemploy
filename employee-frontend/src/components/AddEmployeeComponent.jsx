import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        console.log('Employee data loaded:', response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.error('Error loading employee:', error);
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email }
      console.log('Saving employee:', employee)

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log('Employee updated successfully:', response.data);
          alert('Employee updated successfully!');
          navigator('/employees');
        }).catch(error => {
          console.error('Error updating employee:', error);
          alert('Error updating employee. Please try again.');
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log('Employee created successfully:', response.data);
          alert('Employee added successfully!');
          navigator('/employees')
        }).catch(error => {
          console.error('Error creating employee:', error);
          alert('Error creating employee. Please try again.');
        })
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if (email.trim()) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        errorsCopy.email = '';
      } else {
        errorsCopy.email = 'Please enter a valid email';
        valid = false;
      }
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className='card-title'><i className="bi bi-pencil-square me-2"></i>Update Employee</h2>
    } else {
      return <h2 className='card-title'><i className="bi bi-person-plus me-2"></i>Add New Employee</h2>
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <div className='custom-card'>
            {pageTitle()}
            <form onSubmit={saveOrUpdateEmployee}>
              <div className='form-group mb-4'>
                <label className='form-label'>
                  <i className="bi bi-person me-2"></i>First Name
                </label>
                <input
                  type='text'
                  placeholder='Enter first name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-4'>
                <label className='form-label'>
                  <i className="bi bi-person me-2"></i>Last Name
                </label>
                <input
                  type='text'
                  placeholder='Enter last name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-4'>
                <label className='form-label'>
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
                <input
                  type='email'
                  placeholder='Enter email address'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className='text-center mt-4'>
                <button className='btn btn-submit me-2' type='submit'>
                  <i className="bi bi-check-circle me-2"></i>
                  {id ? 'Update Employee' : 'Add Employee'}
                </button>
                <button 
                  className='btn btn-secondary' 
                  type='button' 
                  onClick={() => navigator('/employees')}
                  style={{
                    borderRadius: '25px',
                    padding: '12px 40px'
                  }}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeComponent
