import { GhostPostOrPage } from "./ghost"
import { ServiceConfig } from '@components/contact/ContactForm'

export interface ContactPage extends GhostPostOrPage {
  form_topics: string[]
  serviceConfig: ServiceConfig
}

export const defaultPage: ContactPage = {
  id: 'custom-page-contact',
  slug: 'contact',
  url: '/contact',
  title: 'Contact Us',
  custom_excerpt: 'Want to get in touch with the team? Just drop us a line!',
  form_topics: ['I want to give feedback', 'I want to ask a question'],
  meta_title: 'Contact Us',
  meta_description: 'A contact form page.',
  html: '',
  serviceConfig: {
    url: '/api/v1/contact',
    contentType: 'application/json',
  },
  featureImage: {
    url: '/publication-cover.png',
    dimensions: {
      width: 1040,
      height: 250
    }
  }
}
