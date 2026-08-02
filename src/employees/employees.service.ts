import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository : Repository<Employee>
    ) {}

    async create(employeeData: Partial<Employee>): Promise<Employee> {
        const employee= this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);

    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }
    async findOne(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({id});
        if (!employee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return employee;
    }
}
