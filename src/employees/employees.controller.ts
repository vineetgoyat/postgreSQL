import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post()
    async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
        return this.employeesService.create(body);
    }

    @Get()
    async findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Employee> {
        return this.employeesService.findOne(id);
    }

    @Put(':id')
    async updateEmployee(
        @Param('id') id: number,
        @Body() body: Partial<Employee>,
    ): Promise<Employee> {
        return this.employeesService.update(id, body);
    }

}
