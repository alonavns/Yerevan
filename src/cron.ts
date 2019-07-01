import cron from 'node-cron'
import fs from 'fs'
import axios from 'axios'

function getConfig() {
  return JSON.parse(fs.readFileSync('users/config.json').toString())
}

cron.schedule('* * * * *', () => {
  const config = getConfig()
  if (!config.users) {
    config.users = []
  }
  const { lastPage, totalPages = Number.POSITIVE_INFINITY, users } = config
  if (Number(lastPage) <= Number(totalPages)) {
    axios.get(`https://reqres.in/api/users?page=${lastPage}`)
      .then(({ data: { total_pages, data } }) => {
        config.totalPages = total_pages
        config.lastPage += 1
        data.forEach((user: any) => {
          if (!users.find(({ id }: any) => id === user.id)) {
            users.push(user);
          }
        })
        fs.writeFileSync('./users/config.json', JSON.stringify(config))
      }).catch(err => {
        console.log(`Fetch page ${lastPage} failed`);
      })
  } else {
    console.log(`No more users`);
  }
})