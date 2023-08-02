import CompanionForm from '@/components/companion-form';
import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage: React.FC<CompanionIdPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prismadb.companion.findUnique({
    where: { id: params.companionId, userId },
  });
  const categories = await prismadb.category.findMany();
  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
