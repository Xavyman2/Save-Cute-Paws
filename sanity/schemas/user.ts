import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'password',
      title: 'Password Hash',
      type: 'string',
      validation: Rule => Rule.required(),
      hidden: true
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'User', value: 'user'},
          {title: 'Volunteer', value: 'volunteer'},
          {title: 'Admin', value: 'admin'}
        ]
      },
      initialValue: 'user'
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text'
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'isVolunteer',
      title: 'Is Volunteer',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'volunteerSkills',
      title: 'Volunteer Skills',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({document}) => !document?.isVolunteer
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Tell us about yourself'
    }),
    defineField({
      name: 'provider',
      title: 'Auth Provider',
      type: 'string',
      description: 'How the user signed up (email, google, facebook, etc.)',
      options: {
        list: [
          {title: 'Email', value: 'credentials'},
          {title: 'Google', value: 'google'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Twitter/X', value: 'twitter'},
          {title: 'TikTok', value: 'tiktok'}
        ]
      },
      initialValue: 'credentials'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      role: 'role'
    },
    prepare(selection) {
      const {title, subtitle, role} = selection
      return {
        title,
        subtitle: `${subtitle} (${role})`
      }
    }
  }
})
