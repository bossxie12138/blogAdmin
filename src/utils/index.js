import MD5 from 'crypto-js/md5'

export const color = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

export const clearObj = obj => {
  for (const key in obj) {
    delete obj[key]
  }
}

export const md5 = (str, salt) => {
  let md5Salt = MD5(salt).toString().toUpperCase()
  let md5Str = MD5(md5Salt + str).toString().toUpperCase()
  return md5Str
} 

export const config = {
  jwtSecret: 'someinfosofthesecondjsonwebtoken'
}