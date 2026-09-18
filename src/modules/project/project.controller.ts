import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ListProjectsDto } from './dto/list-projects.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller({ path: 'project', version: "1" })
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) { }
    @Public()
    @Get()
    getAll(@Query() pagination: ListProjectsDto) {
        console.log(pagination);
        return pagination

    }

}
