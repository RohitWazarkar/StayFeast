import { connectDB } from "@/lib/db";

// ✅ GET all employees
export async function GET() {
  const db = await connectDB();
  const result = await db.request().query("SELECT * FROM Employees");
  return Response.json(result.recordset); // return only rows
}

// ✅ POST new employee
export async function POST(req) {
  const { name, position, email, salary } = await req.json();
  const db = await connectDB();
  await db
    .request()
    .input("name", name)
    .input("position", position)
    .input("email", email)
    .input("salary", salary)
    .query(
      "INSERT INTO Employees (name, position, email, salary) VALUES (@name, @position, @email, @salary)"
    );
  return Response.json({ message: "Employee added!" });
}

// ✅ PUT update employee
export async function PUT(req) {
  const { id, name, position, email, salary } = await req.json();
  const db = await connectDB();
  await db
    .request()
    .input("id", id)
    .input("name", name)
    .input("position", position)
    .input("email", email)
    .input("salary", salary)
    .query(
      "UPDATE Employees SET name = @name, position = @position, email = @email, salary = @salary WHERE id = @id"
    );
  return Response.json({ message: "Employee updated!" });
}


export async function DELETE(req) {
  try {
    // Extract ID from URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    const db = await connectDB();

    await db.request()
      .input("id", id)
      .query("DELETE FROM Employees WHERE id = @id");

    return NextResponse.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
