import { Notas } from '../entities/notas.entity';
import { NotasInstDto } from '../dto/notas-inst.dto';
import { NotasUpdDto } from '../dto/notas-upd.dto';

export const INotasRepository = Symbol("INotasRepository"); // Token de inyección

export interface INotasRepository {
    getNotasByUsuario(idUsuario: string): Promise<Notas[]>;
    getNotaById(idNotas: string, idUsuario: string): Promise<Notas | null>;
    createNota(idUsuario: string, datos: NotasInstDto): Promise<Notas>;
    updateNota(idUsuario: string, datos: NotasUpdDto): Promise<Notas>;
    deleteNota(idNotas: string, idUsuario: string): Promise<Notas>;
}