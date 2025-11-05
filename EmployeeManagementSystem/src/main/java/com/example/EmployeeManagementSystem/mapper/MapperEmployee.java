package com.example.EmployeeManagementSystem.mapper;

import com.example.EmployeeManagementSystem.dto.DtoEmployee;
import com.example.EmployeeManagementSystem.model.Employee;

public class MapperEmployee {
    public static Employee mapTOEmployee(DtoEmployee dtoEmployee){
         return new Employee(
                dtoEmployee.getId(),
                dtoEmployee.getFirstName(),
                dtoEmployee.getLastName(),
                dtoEmployee.getEmail()
        );
    }
    public static DtoEmployee mapToDtoEmployee(Employee employee){
        return new DtoEmployee(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

}
