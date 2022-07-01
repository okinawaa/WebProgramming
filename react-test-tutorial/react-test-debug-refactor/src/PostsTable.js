import React from "react";
import classNames from "classnames";
import styles from "./PostsTable.module.css";

function PostsTable({ posts }) {
  return (
    <table border="1" className={styles.table}>
      <thead>
        <tr>
          <th className={styles.cell}>Title</th>
          <th className={styles.cell}>Author</th>
          <th className={styles.cell}>Score</th>
        </tr>
      </thead>

      <tbody>
        {posts.map(({ id, title, author, score }) => (
          <tr key={id}>
            <td className={classNames(styles.cell, styles.title)}>{title}</td>
            <td className={styles.cell}>{author}</td>
            <td className={styles.cell}>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostsTable;
