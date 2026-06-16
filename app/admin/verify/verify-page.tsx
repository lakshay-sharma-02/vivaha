"use client"

import { useState, useEffect } from "react"
import { getPendingProfiles, adminUpdateProfileStatus } from "../actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AdminVerificationPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectionReason, setRejectionReason] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    loadProfiles()
  }, [])

  async function loadProfiles() {
    try {
      const data = await getPendingProfiles()
      setProfiles(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(profileId: string, status: 'approved' | 'rejected') {
    try {
      await adminUpdateProfileStatus(
        profileId, 
        status, 
        status === 'rejected' ? rejectionReason[profileId] : undefined
      )
      await loadProfiles()
    } catch (err) {
      alert("Error updating profile")
    }
  }

  if (loading) return <div>Loading pending profiles...</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Pending Verifications</h1>
      {profiles.length === 0 ? (
        <p>No pending profiles to verify.</p>
      ) : (
        <div className="grid gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>{profile.full_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Gender: {profile.gender}</p>
                    <p className="text-sm text-gray-500">DOB: {profile.date_of_birth}</p>
                    <p className="mt-2 font-medium">Bio:</p>
                    <p className="text-sm">{profile.profile_details?.bio}</p>
                  </div>
                  <div>
                    <p className="font-medium">Verification Docs:</p>
                    {profile.verification_docs?.map((doc: any) => (
                      <a 
                        key={doc.id} 
                        href={doc.doc_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        View {doc.doc_type}
                      </a>
                    ))}
                    <div className="mt-4 space-y-2">
                      <Input 
                        placeholder="Rejection reason (required for reject)" 
                        value={rejectionReason[profile.id] || ""}
                        onChange={(e) => setRejectionReason({...rejectionReason, [profile.id]: e.target.value})}
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleUpdate(profile.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button 
                          onClick={() => handleUpdate(profile.id, 'rejected')}
                          variant="destructive"
                          disabled={!rejectionReason[profile.id]}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
