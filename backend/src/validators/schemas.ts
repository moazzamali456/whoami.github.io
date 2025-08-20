import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const createStudentSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().optional(),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format'),
    rollNumber: z.string().min(1, 'Roll number is required'),
    department: z.string().min(1, 'Department is required'),
    semester: z.string().min(1, 'Semester is required'),
  }),
});

export const updateStudentSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date format').optional(),
    rollNumber: z.string().min(1, 'Roll number is required').optional(),
    department: z.string().min(1, 'Department is required').optional(),
    semester: z.string().min(1, 'Semester is required').optional(),
  }),
});

export const validate = (schema: z.ZodSchema) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      next(error);
    }
  };
};
