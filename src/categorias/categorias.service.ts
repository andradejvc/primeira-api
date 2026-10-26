import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: dto,
    });
  }

  async listar() {
    return this.prisma.categoria.findMany({
      include: { produtos: true },
    });
  }

  async buscarPorId(id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: { produtos: true },
    });
  }
}