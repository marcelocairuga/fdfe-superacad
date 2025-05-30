import styles from '../../layouts/form.module.css';
import z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Course } from '../../api/courses';

const formSchema = z.object({
   name: z.string().min(1, "Nome é obrigatório"),
   periods: z.coerce.number().int().min(1, "Curso deve ter pelo menos 1 semestre"),
}); 

export type FormData = z.infer<typeof formSchema>;

interface FormCourseProps {
   isOpen: boolean;
   onClose: () => void;
   onSubmit: (data: FormData) => void;
   course: Course | null;
}

export function FormCourse({isOpen, onClose, onSubmit, course}: FormCourseProps) {

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm<FormData>({
      resolver: zodResolver(formSchema)
   });

   useEffect(() => {
      if (course) {
         reset(course);
      } else {
         reset({
            name: '',
            periods: 1,
         });
      }
   }, [course, isOpen]);

   if (!isOpen) return null;

   const handleFormSubmit = (data: FormData) => {
      onSubmit(data);
      reset();
      onClose();
   };

   return (
      <div className={styles.modal}>
         <div className={styles.container}>
            <div className={styles.header}>
               <span>Curso</span>
               <button onClick={onClose}>x</button>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
               <div className={styles.textfield}>
                  <label>Nome do Curso</label>
                  <input type="text" {...register("name")} />
                  {errors.name && <span className={styles.error}>{errors.name.message}</span>}
               </div>   
               <div className={styles.textfield}>
                  <label>Semestres</label>
                  <input type="number" {...register("periods")} />
                  {errors.periods && <span className={styles.error}>{errors.periods.message}</span>}
               </div>               
               <div className={styles.actions}>
                  <button type="button" className={styles.cancelButton} onClick={onClose}>
                     Cancelar
                  </button>
                  <button type="submit" className={styles.submitButton}>
                     Salvar
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}