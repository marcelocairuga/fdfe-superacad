import { GridCourses } from "./grid";
import { FormCourse } from "./form";
import { useState, useEffect } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../../api/courses";
import type { Course } from "../../api/courses"
import styles from '../../layouts/layout.module.css';

type CourseData = Omit<Course, "id">;

export function Courses() {
   const [isOpen, setIsOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [courses, setCourses] = useState<Course[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [editingCourse, setEditingCourse] = useState<Course | null>(null);

   useEffect(() => {
      fetchCourses();
   }, []);

   const fetchCourses = async () => {
      try {
         setIsLoading(true);
         setError(null);
         const data = await getCourses();
         setCourses(data);
      } catch (err) {
         console.error(err);
         setError("Erro ao buscar a listagem de cursos");
      } finally {
         setIsLoading(false);
      }
   }

   const closeModal = () => setIsOpen(false);

   const handleFormSubmit = async (formData: CourseData) => {
      setIsLoading(true);
      setIsOpen(false);
      try {
         if (editingCourse) {
            await updateCourse(editingCourse.id, formData);
            setEditingCourse(null);
         } else {
            await createCourse(formData);
         }
         await fetchCourses();
      } catch (err) {
         console.error(err);
         alert("Erro ao salvar o curso!");
      } finally {
         setIsLoading(false);
      }
   };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setIsLoading(true);
      setError(null);
      try {
         await deleteCourse(id);
         await fetchCourses();
      } catch (err) {
         console.error('Erro ao excluir curso:', err);
         alert("Erro ao excluir o curso");
      } finally {
         setIsLoading(false);
      }
    }
  };

   const handleEdit = (course: Course) => {
      setEditingCourse(course);
      setIsOpen(true);
   };

   return (
      <>
         <div className={styles.title}>
            <h2>Listagem de Cursos</h2>
            <button className={styles.buttonAdd} onClick={() => setIsOpen(true)}>
               Novo Curso
            </button>
         </div>

         {error ? <p className={styles.error}>{error}</p>
         : <GridCourses courses={courses} onEdit={handleEdit} onDelete={handleDelete} />}

         {isLoading && <p className={styles.loading}>Carregando...</p>}

         <FormCourse isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} course={editingCourse} />
      </>
   )
}