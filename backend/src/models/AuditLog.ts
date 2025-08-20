import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export interface AuditLogAttributes {
  id: number;
  actorUserId: number;
  action: string;
  entity: string;
  entityId: number;
  metadata: object;
  createdAt?: Date;
}

export interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id'> {}

export class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  public id!: number;
  public actorUserId!: number;
  public action!: string;
  public entity!: string;
  public entityId!: number;
  public metadata!: object;
  public readonly createdAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    actorUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'audit_logs',
    timestamps: true,
  },
);
