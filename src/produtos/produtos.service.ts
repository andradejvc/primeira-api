import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateProdutoDto) {
    return this.prisma.produto.create({ data: dto });
  }

  listarTodos() {
    return this.prisma.produto.findMany({ include: { categoria: true } });
  }

  buscarPorId(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });
  }

  atualizar(id: number, dto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: dto,
    });
  }

  remover(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}