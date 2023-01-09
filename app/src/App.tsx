import { Routes, Route, Link, useLocation } from 'react-router-dom'

import {
  AccessToken,
  Channel,
  Content,
  Home,
  SfdxLogin,
  Success,
} from '@app/pages'
import { Layout } from '@app/components'

function App() {
  const location = useLocation()

  return (
    <>
      {/* Routes nest inside one another. Nested route paths build upon
      parent route paths, and nested route elements render inside
      parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/token'>
            <Route index element={<Home />} />

            <Route path='sfdx' element={<SfdxLogin />} />
            <Route path='raw' element={<AccessToken />} />
          </Route>

          <Route path='channel/:username' element={<Channel />} />
          <Route path='content/:channelId' element={<Content />} />
          <Route path='success' element={<Success />} />

          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          <Route
            path='*'
            element={
              <div>
                <p>Oops, route does not exist</p>
                <p>{location.pathname}</p>
                <Link to='/'>go back home</Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
