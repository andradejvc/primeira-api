import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // ou o caminho correto do teu PrismaService
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: dto });
  }

  listarTodas() {
    return this.prisma.categoria.findMany({ include: { produtos: true } });
  }

  buscarPorId(id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
      include: { produtos: true },
    });
  }

  atualizar(id: number, dto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: dto,
    });
  }

  remover(id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}