'use client'

import React, { useState, useEffect } from 'react'
// NextJS imports
import Image from 'next/image'
// MUI imports
import { Box, Typography, Paper, Container, CircularProgress } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// Custom imports
import { formatDate } from '../../../utils/dateUtils'

interface TrackingInfo {
  shippingAddress: {
    name: string
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
  }
  imbNumber: string
  isAvailable: boolean
  latestScan?: string
  expectedDeliveryDate?: string
  fullHistory?: {
    data: {
      expected_delivery_date: string
      scans: Array<{
        scan_date_time: string
        scan_facility_city: string
        scan_facility_state: string
        mail_phase: string
        // Add other properties of scan if needed
      }>
    }
  }
}

export default function TrackingPortal() {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const imb = searchParams.get('imb')
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:4001/api/tracking/${imb}`)
        if (!response.ok) {
          throw new Error('Failed to fetch tracking information')
        } else {
          const data = await response.json()
          data.isAvailable = true
          setTrackingInfo(data)
        }
      } catch (err) {
        setError('Error fetching tracking information. Please try again later.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [imb])

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
    <Container maxWidth={false} sx={{ height: '100vh' }} disableGutters>
      <header className="mb-7">
        <Box sx={{ mb: 4, width: '300px', height: '70px', position: 'relative', margin: '0 auto' }}>
          <Image src="/logo.png" alt="GovDocs Logo" layout="fill" objectFit="contain" />
        </Box>
      </header>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50%', margin: '0 auto' }}>
        <Box>
          <Typography className="text-base font-semibold font-openSans mb-3">Shipping Address</Typography>
          <Typography className="text-sm font-openSans">{trackingInfo.shippingAddress.name}</Typography>
          <Typography className="text-sm font-openSans">{trackingInfo.shippingAddress.address1}</Typography>
          {trackingInfo.shippingAddress.address2 && <Typography>{trackingInfo.shippingAddress.address2}</Typography>}
          <Typography className="text-sm font-openSans">{`${trackingInfo.shippingAddress.city}, ${trackingInfo.shippingAddress.state} ${trackingInfo.shippingAddress.zipCode}`}</Typography>
        </Box>
        <Box>
          <Typography className="text-base font-semibold font-openSans mb-3" gutterBottom>
            Shipping Info #
          </Typography>
          <Typography className="text-sm font-openSans">{trackingInfo.imbNumber}</Typography>
        </Box>
      </Box>
      {trackingInfo.isAvailable ? (
        <>
          <Box className="text-center" sx={{ width: '50%', margin: '0 auto' }}>
            <Typography className="text-sm font-openSans">
              <strong>Your package has shipped. Expected delivery date is:</strong>
            </Typography>
            <Typography className="text-sm font-openSans">{trackingInfo.fullHistory?.data?.expected_delivery_date}</Typography>
          </Box>
          <Box sx={{ width: '50%', margin: '20px auto' }}>
            <Typography className="text-base font-semibold font-openSans mb-3">Scan History</Typography>
            {trackingInfo.fullHistory?.data?.scans.map((scan, index) => (
              <div className="mb-5">
                <Typography key={scan.scan_date_time} className="text-sm font-openSans mb-2">
                  {formatDate(scan.scan_date_time).date}
                </Typography>
                <hr className="mb-1" />
                <div className="grid grid-cols-3 w-full">
                  <Typography key={scan.scan_date_time} className="text-sm font-openSans mb-2 justify-self-start">
                    {scan.mail_phase}
                  </Typography>
                  <Typography key={scan.scan_date_time} className="text-sm font-openSans mb-2 justify-self-center">
                    {scan.scan_facility_city}, {scan.scan_facility_state}
                  </Typography>
                  <Typography key={scan.scan_date_time} className="text-sm font-openSans mb-2 justify-self-end">
                    {formatDate(scan.scan_date_time).time}
                  </Typography>
                </div>
              </div>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
          <Typography variant="h6" gutterBottom>
            Shipping information is no longer available.
          </Typography>
          <Typography className="text-sm font-openSans">
            If you believe this package was not received, please contact your
            <br />
            GovDocs Account Manager. Thank you.
          </Typography>
        </Box>
      )}
    </Container>
  )
}
