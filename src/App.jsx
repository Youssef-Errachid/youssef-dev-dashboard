
function App() {
  return (
    <main className="min-h-screen bg-[#080b14] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-5 inline-flex rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Developer Dashboard
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome,{' '}
            <span className="text-blue-500">
              Youssef
            </span>
          </h1>

          <p className="mt-4 text-slate-400">
            Your personal developer workspace.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-1/2 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
