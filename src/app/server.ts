import { Env } from '@environment/env'

import { app } from './app'

const PORT = Env.PORT

app.listen(PORT, () => console.log(`Server online - running on port ${PORT}`))