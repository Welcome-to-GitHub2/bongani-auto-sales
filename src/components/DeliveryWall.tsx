export default function DeliveryWall() {

  const images = [
    "/src/assets/img000000.jpg",
    "/src/assets/img00000.jpg",
    "/src/assets/img0000.jpg",
    "/src/assets/img000.jpg"
  ];

  return (
    <section className="section">

      <div className="page-container">

        <div className="text-center mb-10">

          <div className="section-label mb-2">
            Real Deliveries
          </div>

          <h2>
            Happy Customers Driving Away
          </h2>

          <p className="text-muted-foreground text-sm mt-2">
            Real customers. Real deliveries. Real results.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {images.map((img, i) => (

            <img
              key={i}
              src={img}
              className="rounded-xl w-full object-cover"
            />

          ))}

        </div>

      </div>

    </section>
  );
}