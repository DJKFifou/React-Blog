export default function LoginForm({ onSubmit, error, isDisabled }) {
    return (
      <form action={onSubmit} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="username">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-3 py-2 text-white rounded-lg w-fit ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black cursor-pointer"
          }`}
        >
          Sign in
        </button>
      </form>
    );
  }
  