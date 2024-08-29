// src/app/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Container, CircularProgress } from '@mui/material'
import Image from 'next/image'

interface TrackingInfo {
  shippingAddress: {
    name: string
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
  }
  shippingInfoNumber: string
  isAvailable: boolean
  latestScan?: string
  expectedDeliveryDate?: string
  fullHistory?: string[]
}

export default function TrackingPortal() {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:4001/api/tracking/003109000008885071200760')
        if (!response.ok) {
          throw new Error('Failed to fetch tracking information')
        }
        const data = await response.json()
        setTrackingInfo(data)
      } catch (err) {
        setError('Error fetching tracking information. Please try again later.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [])

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !trackingInfo) {
    return (
      <Container maxWidth="md" sx={{}}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error">{error || 'No tracking information available'}</Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 4, width: '200px', height: '50px', position: 'relative' }}>
          <Image src="/logo.jpg" alt="GovDocs Logo" layout="fill" objectFit="contain" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>{trackingInfo.shippingAddress.name}</Typography>
            <Typography>{trackingInfo.shippingAddress.address1}</Typography>
            {trackingInfo.shippingAddress.address2 && <Typography>{trackingInfo.shippingAddress.address2}</Typography>}
            <Typography>{`${trackingInfo.shippingAddress.city}, ${trackingInfo.shippingAddress.state} ${trackingInfo.shippingAddress.zipCode}`}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Shipping Info #
            </Typography>
            <Typography>{trackingInfo.shippingInfoNumber}</Typography>
          </Box>
        </Box>

        {trackingInfo.isAvailable ? (
          <Box sx={{ width: '100%' }}>
            <Typography>
              <strong>Latest Update:</strong> {trackingInfo.latestScan}
            </Typography>
            <Typography>
              <strong>Expected Delivery Date:</strong> {trackingInfo.expectedDeliveryDate}
            </Typography>
            {/* Add more tracking details as needed */}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Shipping information is no longer available.
            </Typography>
            <Typography>
              If you believe this package was not received, please contact your
              <br />
              GovDocs Account Manager. Thank you.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}
