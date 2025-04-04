import { Skeleton } from "@/components/ui/skeleton";

export default function FAQLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Skeleton className="h-24 w-3/4 mx-auto bg-charcoal/30" />
            <Skeleton className="h-16 w-full mx-auto mt-8 bg-charcoal/30" />
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="relative py-32 md:py-40">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Skeleton className="h-16 w-3/4 mx-auto bg-charcoal/30" />
            <Skeleton className="h-8 w-full mx-auto mt-4 bg-charcoal/30" />
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-16 w-full bg-charcoal/40 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 