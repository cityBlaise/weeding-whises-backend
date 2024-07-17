import { PartialType } from "@nestjs/mapped-types"; 
import { CreatePostDto } from "./Post.create.dto";

  
export class UpdatePostDto extends PartialType (CreatePostDto) {}
