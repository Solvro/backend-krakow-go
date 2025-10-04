-- AlterEnum
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"SubmissionStatus"'::regtype
      AND enumlabel = 'COMPLETED'
  ) THEN
    ALTER TYPE "SubmissionStatus" ADD VALUE 'COMPLETED';
  END IF;
END;
$$;
