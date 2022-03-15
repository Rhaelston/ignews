import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe'

type HomePros = {
  product:{
    priceId: string,
    amount: number
  }
}


export default function Home({product}: HomePros) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the<span>React</span> World.</h1>
          <p>
            get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image src="/images/avatar.svg" alt="Girl Coding" width="336" height="521"/>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps  = async () =>{
  const price = await stripe.prices.retrieve('price_1KdajTBpft93nzrgYcgCshWG', {
    expand: ["product"]
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('BRL', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount /100)
  }
 
  return{
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}