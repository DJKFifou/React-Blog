export default function SearchForm({ onSubmit }) {
    return (
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          name="research"
          className="border rounded-xs px-2 py-1"
          placeholder="Search post..."
        />
        <button
          type="submit"
          className="text-white px-3 py-2 bg-black rounded-xs cursor-pointer"
        >
          Search
        </button>
      </form>
    );
  }
  