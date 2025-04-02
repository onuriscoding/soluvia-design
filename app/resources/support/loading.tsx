import { Skeleton } from "@/components/ui/skeleton";

export default function SupportLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Skeleton className="h-24 w-3/4 mx-auto bg-charcoal/30" />
            <Skeleton className="h-16 w-full mx-auto mt-8 bg-charcoal/30" />
            <div className="mt-12 flex justify-center gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-32 bg-charcoal/40 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Info Section Skeleton */}
      <section className="relative py-24 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full bg-charcoal/40 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="relative py-24 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Skeleton className="h-16 w-3/4 mx-auto bg-charcoal/30" />
            <Skeleton className="h-8 w-full mx-auto mt-4 bg-charcoal/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-[600px] w-full bg-charcoal/40 rounded-2xl" />
            <Skeleton className="h-[600px] w-full bg-charcoal/40 rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
} 