import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefacring1720604389812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user CHANGE  UserId  userId VARCHAR(36)');
    await queryRunner.query('ALTER TABLE user CHANGE  UserName  userName VARCHAR(255) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user CHANGE  userId  UserId VARCHAR(36)');
    await queryRunner.query('ALTER TABLE user CHANGE  userName  UserName VARCHAR(255) NOT NULL');
  }
}
