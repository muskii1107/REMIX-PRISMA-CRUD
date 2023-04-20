-- DropIndex
DROP INDEX `TodoList_id_key` ON `todolist`;

-- AlterTable
ALTER TABLE `todolist` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
