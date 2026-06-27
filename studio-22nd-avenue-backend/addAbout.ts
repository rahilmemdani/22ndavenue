import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function main() {
  const doc = {
    _type: 'about',
    directors: [
      {
        _key: 'dir1',
        name: 'Aditya Mehra',
        title: 'Director',
      },
      {
        _key: 'dir2',
        name: 'Daryl Sheldon',
        title: 'Director',
      },
      {
        _key: 'dir3',
        name: 'Manoj Gopalani',
        title: 'Director',
      }
    ],
    story: [
      {
        _key: 'blk1',
        _type: 'block',
        children: [
          {
            _key: 'spn1',
            _type: 'span',
            text: '22nd Avenue was born from a vision to craft world-class experiences in entertainment, founded by Aditya Mehra, Daryl Sheldon and Manoj Gopalani.',
            marks: []
          }
        ],
        markDefs: [],
        style: 'normal'
      },
      {
        _key: 'blk2',
        _type: 'block',
        children: [
          {
            _key: 'spn2',
            _type: 'span',
            text: 'Under ',
            marks: []
          },
          {
            _key: 'spn3',
            _type: 'span',
            text: 'Manoj\'s leadership',
            marks: ['textColor_gold']
          },
          {
            _key: 'spn4',
            _type: 'span',
            text: ', what started as an idea soon evolved into a ',
            marks: []
          },
          {
            _key: 'spn5',
            _type: 'span',
            text: 'trusted name',
            marks: ['textColor_gold']
          },
          {
            _key: 'spn6',
            _type: 'span',
            text: ' in an ever-evolving industry.',
            marks: []
          }
        ],
        markDefs: [
          {
            _key: 'textColor_gold',
            _type: 'textColor',
            color: 'gold'
          }
        ],
        style: 'normal'
      },
      {
        _key: 'blk3',
        _type: 'block',
        children: [
          {
            _key: 'spn7',
            _type: 'span',
            text: 'Our mission is simple: to ',
            marks: []
          },
          {
            _key: 'spn8',
            _type: 'span',
            text: 'redefine industry norms',
            marks: ['textColor_gold']
          },
          {
            _key: 'spn9',
            _type: 'span',
            text: ' and ',
            marks: []
          },
          {
            _key: 'spn10',
            _type: 'span',
            text: 'stay ahead of the curve',
            marks: ['textColor_gold']
          },
          {
            _key: 'spn11',
            _type: 'span',
            text: '.',
            marks: []
          }
        ],
        markDefs: [
          {
            _key: 'textColor_gold',
            _type: 'textColor',
            color: 'gold'
          }
        ],
        style: 'normal'
      }
    ]
  }

  try {
    const res = await client.create(doc)
    console.log('About / Behind the Spotlight data created in Sanity with ID:', res._id)
  } catch (err) {
    console.error('Error creating document:', err)
  }
}

main()
