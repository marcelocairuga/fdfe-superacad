import type { Course } from "../../api/courses";
import styles from "../../layouts/grid.module.css"

interface GridCoursesProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

export function GridCourses({courses, onEdit, onDelete}: GridCoursesProps) {

return (
      <>
         <table className={styles.grid}>
         <thead>
            <tr>
               <th>ID</th>
               <th>Curso</th>
               <th>Semestres</th>
               <th>Ações</th>
            </tr>
         </thead>
         <tbody>
         {courses.map((course) =>
            <tr key={course.id}>
               <td>{course.id}</td>
               <td>{course.name}</td>
               <td>{course.periods}</td>
               <td className={styles.gridActions}>
                  <button className={styles.buttonEdit} onClick={() => onEdit(course)}>
                     Editar
                  </button>
                  <button className={styles.buttonDelete} onClick={() => onDelete(course.id)}>
                     Excluir
                  </button>
               </td>
            </tr>
         )}
         </tbody>
         </table>
      </>
   );
};
