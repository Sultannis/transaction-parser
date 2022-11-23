import { TransactionSourceDao } from 'src/modules/transaction-sources/repository/dao/transaction-source.dao';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionDao {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'source_id', type: 'bigint' })
  sourceId: number;

  @Column({ name: 'amount', type: 'int' })
  amount: number;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'transfer_date', type: 'timestamptz' })
  transferDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: string;

  @JoinColumn({ name: 'source_id' })
  @ManyToOne(
    () => TransactionSourceDao,
    (transactionSource) => transactionSource.transactions,
  )
  source: TransactionSourceDao;
}
