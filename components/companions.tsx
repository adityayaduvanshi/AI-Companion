import { Companion } from '@prisma/client';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

interface CompanionsProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

const Companions = ({ data }: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className=" relative w-60 h-60">
          <Image src="/empty.png" alt="Empty" fill />
        </div>
        <p className=" text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10 gap-2 ">
      {data.map((item) => (
        <Card
          key={item.id}
          className=" bg-primary/10 rounded-xl cursor-pointer  hover:opacity-75 transition border-0  "
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className=" flex items-center justify-center text-center text-muted-foreground">
              <div className=" relative h-32 w-32">
                <Image
                  src={item.src}
                  alt="companion image"
                  fill
                  className=" rounded-xl object-cover"
                />
              </div>
              <p className=" font-bold">{item.name}</p>
              <p className=" text-xs ">{item.description}</p>
            </CardHeader>
            <CardFooter className=" flex justify-between items-center text-xs text-muted-foreground">
              <p className=" lowercase">@{item.userName}</p>
              <div className=" flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Companions;
